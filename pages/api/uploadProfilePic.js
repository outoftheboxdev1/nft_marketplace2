import { put } from '@vercel/blob';

export default async function handler(request, response) {
  try {
    const { searchParams } = new URL(request.url);
    const currentAccount = searchParams.get('user');
    const file = request.files.file[0];
    const fileExtension = file.name.split('.').pop(); // Get the file extension
    const filename = `${currentAccount}.${fileExtension}`;

    const blob = await put(filename, file, {
      access: 'public',
    });

    // Respond with a JSON object containing the blob URL
    return response.status(200).json({ success: true, blobUrl: blob.url });
  } catch (error) {
    // Handle any errors that occur during the upload process
    console.error('Error uploading file:', error);
    return response.status(500).json({ success: false, message: 'File upload failed' });
  }
}
