export interface ProductDetailDto {
    id: string;
    status: number;
    fullName: string;
    point: number;
    ranking: number;
    gift: number;
    challenge: number;
    age: number;
    gender: number;
    country: string;
    phoneNumberCountryCode: string;
    phoneNumber: string;
    imagePath: null | string;
    showProfilePhoto: boolean;
    showScore: boolean;
    showVideoRating: boolean;
    email: string
}