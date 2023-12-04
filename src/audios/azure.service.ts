import { Injectable } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';

@Injectable()
export class AzureStorageService {
  private readonly blobServiceClient: BlobServiceClient;

  constructor() {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      'DefaultEndpointsProtocol=https;AccountName=deafyimgmusic;AccountKey=/PgxAXZ/qL8X11vL/9fZZT4pqXpysXVEv3e5qe+UcNCAWPTve/CpK0Y0s88XRHq2Vy6EItpXJ4Pu+ASt1mbD2A==;EndpointSuffix=core.windows.net',
    );
  }

  async uploadToAzureBlob(file) {
    const containerName = 'musicas'; // Nome do seu container
    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);
    const blobName = `${Date.now()}-${file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(file.buffer, file.buffer.byteLength);

    return { uploaded: true, blobName };
  }
}
