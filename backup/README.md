# Future Folklore Agent API

This folder contains a minimal FastAPI application to expose your
agentic functions as HTTP endpoints. It is designed for testing
integrations with n8n Cloud and can be deployed locally or on a free
hosting service.

## Endpoints

| Method | Endpoint      | Description                                            |
|-------:|---------------|--------------------------------------------------------|
|  POST  | `/summarise`  | Accepts a JSON payload with `url` and returns a placeholder summary. Replace the implementation in `app.py` with your actual summarisation logic. |
|   GET  | `/trends`     | Returns a static list of trending topics and a timestamp. Replace this with your own trend‑watch logic. |

### Example request to `/summarise`

```sh
curl -X POST -H "Content-Type: application/json" \
     -d '{"url": "https://example.com/article"}' \
     http://localhost:8000/summarise
```

### Example response

```json
{
  "url": "https://example.com/article",
  "title": "Placeholder Title",
  "keywords": ["sample", "placeholder"],
  "summary": "This is a placeholder summary. Replace with real summarisation."
}
```

## Running locally on your Mac

1. Open a terminal and navigate to this directory:

   ```bash
   cd path/to/ff_agent_api
   ```

2. (Optional) Create and activate a Python virtual environment:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the API server using `uvicorn`:

   ```bash
   uvicorn app:app --reload --host 0.0.0.0 --port 8000
   ```

   The `--reload` flag automatically reloads the server when you modify the code, which is convenient during development.

5. If you need to expose the API to the internet (for example to allow n8n Cloud to reach your local machine), use a tool like **ngrok**:

   ```bash
   ngrok http 8000
   ```

   ngrok will print a public URL (e.g. `https://abcd1234.ngrok.io`) that forwards to your local server. Use this URL in your n8n workflows instead of the placeholder.

6. To stop the server, press `Ctrl+C` in your terminal. To deactivate the virtual environment, run `deactivate`.

## Organising your workspace

* The **FastAPI app** lives in `ff_agent_api/app.py` and defines the HTTP endpoints.
* Third‑party dependencies are listed in `ff_agent_api/requirements.txt`.
* Documentation and usage instructions are in `ff_agent_api/README.md`.
* When you’re done testing, you can simply delete the `ff_agent_api` folder and remove the associated n8n workflows (look for “Summarisation Workflow” and “Trend Watch Workflow” in your n8n workspace).

Feel free to extend this starter app by importing the agent classes from the
`ff_system/agents/` directory or by connecting to your own data sources.