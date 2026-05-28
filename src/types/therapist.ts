export interface TherapistProfile {
    name: string;
    email: string;

    crp?: string;

    specialization?: string;

    experience?: string;

    country?: string;

    city?: string;

    modality?: 'ONLINE' | 'IN_PERSON' | 'BOTH';

    profileImage?: string;
}