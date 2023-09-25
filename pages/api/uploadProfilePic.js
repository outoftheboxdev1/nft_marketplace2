import { put } from '@vercel/blob';

export default async function handler(request, response) {
  const fileExtension = request.query.filename.split('.').pop(); // Get the file extension
  const blob = await put(request.query.filename, request.body, {
    access: 'public',
    contentDisposition: `attachment; filename="${request.query.user}${fileExtension}"`,
  });

  return response.status(200).json(blob);
}
