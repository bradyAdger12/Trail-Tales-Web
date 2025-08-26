import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
export class S3 {
    private static instance: S3
    client: S3Client | null = null
    public static getInstance() {
        if (!S3.instance) {
            S3.instance = new S3();
        }
        return S3.instance;
    }

    constructor() {
        this.client = new S3Client({
            region: "us-west-2",
            credentials: {
                accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY as string,
                secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY as string
            }
        });
    }

    static getUrl(path: string) {
        const baseUrl = `https://${import.meta.env.VITE_AWS_BUCKET_NAME}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/`
        return baseUrl + path
    }

    async fetchFileNew({ key }: { key: string }): Promise<string> {
        try {
            const command = new GetObjectCommand({
                Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
                Key: key,
            });
            const response = await this.client?.send(command);
            const array = await response?.Body?.transformToByteArray()
            const blob = new Blob([array!], { type: response?.ContentType })
            const url = URL.createObjectURL(blob);
            return url
        } catch (error) {
            throw new Error(error as string)
        }
    };

    async fetchFile({ key }: { key: string }): Promise<string> {
        try {
            const command = new GetObjectCommand({
                Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
                Key: key,
            });
            const response = await this.client?.send(command);
            const array = await response?.Body?.transformToByteArray()
            const blob = new Blob([array!], { type: response?.ContentType })
            const url = URL.createObjectURL(blob);
            return url
        } catch (error) {
            throw error
        }
    };

    async uploadFile({ file, key }: { file: File, key: string }): Promise<boolean> {
        const buffer = await file.arrayBuffer()
        try {
            const command = new PutObjectCommand({ Body: buffer as any, Bucket: import.meta.env.VITE_AWS_BUCKET_NAME, Key: key, ContentType: file.type })
            const response = await this.client?.send(command)
            if (response) {
                return true
            }
            return false
        } catch (error) {
            console.log(error)
            throw error
        }
    };
}