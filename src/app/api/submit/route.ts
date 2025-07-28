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

    // TODO: Replace this with actual n8n webhook call
    // For now, we'll simulate a successful response
    // const webhookResponse = await fetch('YOUR_N8N_WEBHOOK_URL', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(body),
    // });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

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