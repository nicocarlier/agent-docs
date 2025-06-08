from fastapi import APIRouter
from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from app.db import async_session
from app.models.document import Document
from sqlmodel import select
from typing import AsyncGenerator

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
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Document not found")
    return document
