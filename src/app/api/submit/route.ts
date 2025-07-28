import { NextRequest, NextResponse } from 'next/server';
import { ContentFormData, ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: ContentFormData = await request.json();

    // Validate required fields
    if (!body.title || !body.corePrompt) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Title and core prompt are required.',
      }, { status: 400 });
    }

    // Log the received data (for debugging)
    console.log('Received content submission:', {
      title: body.title,
      corePrompt: body.corePrompt,
      subPrompts: body.subPrompts,
      timestamp: new Date().toISOString(),
    });

    // Forward to n8n webhook
    const webhookResponse = await fetch('https://futurefolklore025.app.n8n.cloud/webhook-test/submit-prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!webhookResponse.ok) {
      console.error('n8n webhook failed:', webhookResponse.status, webhookResponse.statusText);
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Failed to trigger n8n workflow. Please try again.',
      }, { status: 500 });
    }

    const webhookResult = await webhookResponse.json();
    console.log('n8n webhook response:', webhookResult);

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Content submitted successfully. n8n workflow triggered.',
      data: body,
    });

  } catch (error) {
    console.error('Error processing submission:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      message: 'Internal server error. Please try again.',
    }, { status: 500 });
  }
}