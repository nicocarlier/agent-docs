from typing import AsyncGenerator

from app.db import async_session
from app.models.document import Document
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

router = APIRouter()


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session


@router.post("/documents/")
async def create_document(doc: Document, session: AsyncSession = Depends(get_session)):
    session.add(doc)
    await session.commit()
    await session.refresh(doc)
    return doc


@router.get("/documents/")
async def list_documents(session: AsyncSession = Depends(get_session)):
    result = await session.exec(select(Document))
    return result.all()


@router.get("/documents/{document_id}")
async def get_document(document_id: str, session: AsyncSession = Depends(get_session)):
    result = await session.exec(select(Document).where(Document.id == document_id))
    document = result.first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document


@router.put("/documents/{document_id}")
async def update_document(
    document_id: str, doc_update: Document, session: AsyncSession = Depends(get_session)
):
    result = await session.exec(select(Document).where(Document.id == document_id))
    document = result.first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")

    # Update the document fields
    document.title = doc_update.title
    document.content = doc_update.content

    await session.commit()
    await session.refresh(document)
    return document
