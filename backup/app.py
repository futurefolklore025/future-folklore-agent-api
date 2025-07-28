"""
Simple FastAPI application to expose our agent functions as HTTP endpoints.

This service provides two endpoints:

1. **POST /summarise** – Accepts a JSON body with a single field ``url`` and
   returns a placeholder summary object. Replace the implementation in
   ``summarise`` with your actual summarisation logic (e.g. importing the
   summarisation agent from ``ff_system`` or calling an external model).

2. **GET /trends** – Returns a static list of trending topics along with
   a timestamp. This endpoint is intended as a stand‑in for a real trend
   monitoring service. Replace the returned list with data from your
   own trend‑watch agent.

You can run this service locally via ``uvicorn`` and expose it to n8n using
``ngrok`` or deploy it to a cloud platform such as Render or Railway.
"""

from datetime import datetime
from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI(title="Future Folklore Agent API", description="Expose summarisation and trend agents over HTTP")


class SummariseRequest(BaseModel):
    url: str


@app.post("/summarise")
async def summarise(req: SummariseRequest):
    """Return a placeholder summary for the given URL.

    Replace this function's body with your real summarisation logic. For
    example, you could import your ``SummarisationAgent`` from
    ``ff_system/agents/summarisation_agent.py`` and call its ``summarise``
    method here.
    """
    # TODO: integrate the actual summarisation logic here.
    return {
        "url": req.url,
        "title": "Placeholder Title",
        "keywords": ["sample", "placeholder"],
        "summary": "This is a placeholder summary. Replace with real summarisation."
    }


@app.get("/trends")
async def trends():
    """Return a placeholder list of trending topics.

    Replace this with your actual trend‑watch logic. You could call your
    ``TrendWatchAgent`` from ``ff_system/agents/trend_watch_agent.py`` or any
    other data source to retrieve current trends.
    """
    return {
        "trends": ["topic1", "topic2", "topic3"],
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }
