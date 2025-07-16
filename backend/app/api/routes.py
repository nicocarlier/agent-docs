from typing import AsyncGenerator

import jwt
from app.db import async_session
from app.models.document import Document
from fastapi import APIRouter, Depends, Header, HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

router = APIRouter()


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session


async def get_current_user(authorization: str = Header(None)) -> str:
    """Extract user ID from Clerk JWT token"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.replace("Bearer ", "")

    try:
        # For now, we'll use a simple approach - in production you'd verify with Clerk's public key
        # This is a simplified version - you should implement proper JWT verification
        payload = jwt.decode(token, options={"verify_signature": False})
        user_id = payload.get("sub")  # Clerk uses 'sub' for user ID
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.post("/documents/")
async def create_document(
    doc: Document,
    session: AsyncSession = Depends(get_session),
    current_user: str = Depends(get_current_user),
):
    doc.user_id = current_user
    session.add(doc)
    await session.commit()
    await session.refresh(doc)
    return doc


@router.get("/documents/")
async def list_documents(
    session: AsyncSession = Depends(get_session),
    current_user: str = Depends(get_current_user),
):
    result = await session.exec(
        select(Document).where(Document.user_id == current_user)
    )
    return result.all()


@router.get("/documents/{document_id}")
async def get_document(
    document_id: str,
    session: AsyncSession = Depends(get_session),
    current_user: str = Depends(get_current_user),
):
    result = await session.exec(
        select(Document).where(
            Document.id == document_id, Document.user_id == current_user
        )
    )
    document = result.first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document


@router.put("/documents/{document_id}")
async def update_document(
    document_id: str,
    doc_update: Document,
    session: AsyncSession = Depends(get_session),
    current_user: str = Depends(get_current_user),
):
    result = await session.exec(
        select(Document).where(
            Document.id == document_id, Document.user_id == current_user
        )
    )
    document = result.first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")

    # Update the document fields
    document.title = doc_update.title
    document.content = doc_update.content

    await session.commit()
    await session.refresh(document)
    return document
