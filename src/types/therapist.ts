export interface TherapistProfile {
    name: string;
    email: string;

    crp?: string;

    specialty?: string;

    experience?: string;

    country?: string;

    city?: string;

    attendanceModality?: 'ONLINE' | 'PRESENTIAL' | 'BOTH';

    profileImage?: string;
}