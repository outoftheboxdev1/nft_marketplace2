'use server';

import { put, BlobAccessError } from '@vercel/blob';

export default async function handler(request, response) {
  try {
    const blob = await put(request.query.filename, request.body, {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'image/png',
    });
    return response.status(200).json(blob);
  } catch (error) {
    if (error instanceof BlobAccessError) {
      throw error;
    } else {
    // throw the error again if it's unknown
      throw error;
    }
  }
}
