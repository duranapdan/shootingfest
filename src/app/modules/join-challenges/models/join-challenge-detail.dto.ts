
export interface JoinChallengesDto {
    id: string;
    userId: string;
    joinChallengeId: string;
    userChallengeId: string;
    mediaContentUrl: string;
    timeStamp: number;
    contentType: string;
    challengeName: string;
    challengeHeader: string;
    challengeDescription: string;
    targetScore: number;
    points: number | null;
    myScore: number | null;
    fullName: string | null;
    imagePath: string | null;
    country: string | null;
    count: number | null;
    score: number;
}