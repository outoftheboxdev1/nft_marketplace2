'use server';

import { put } from '@vercel/blob';

export default async function handler(request, response) {
  const blob = await put(request.query.filename, request.body, {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'image/png',
  });

  return response.status(200).json(blob);
}
