from datetime import datetime, timezone
from typing import Optional
from uuid import uuid4

from sqlalchemy import Column, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlmodel import Field, SQLModel


class Document(SQLModel, table=True):
    id: Optional[str] = Field(
        default_factory=lambda: str(uuid4()),
        sa_column=Column(UUID(as_uuid=False), primary_key=True),
    )
    title: str
    content: str
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(DateTime(timezone=True)),
    )
