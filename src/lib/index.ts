// Services
export { authService } from '@/services/authService';
export { patientService } from '@/services/patientService';
export { therapistService } from '@/services/therapistService';
export { consultationService } from '@/services/consultationService';
export { objectiveService } from '@/services/objectiveService';
export { reportService } from '@/services/reportService';
export { scenarioService } from '@/services/scenarioService';
export { testService } from '@/services/testService';
export { sessionService } from '@/services/sessionService';
export { apiClient } from '@/services/api';

// Hooks
export { useAuth } from '@/context/AuthContext';
export { usePatient } from '@/hooks/usePatient';
export { useTherapist } from '@/hooks/useTherapist';
export { useConsultation } from '@/hooks/useConsultation';
export { useObjective } from '@/hooks/useObjective';
export { useReport } from '@/hooks/useReport';
export { useScenario } from '@/hooks/useScenario';
export { useTest } from '@/hooks/useTest';
export { useSession } from '@/hooks/useSession';

// Types
export type * from '@/types';
