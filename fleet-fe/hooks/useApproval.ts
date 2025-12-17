// hooks/useApproval.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApprovalService, ApprovalAction, BookingApprovalResponse } from '@/services/approval-services';

type Role = 'ADMIN' | 'SUPERVISOR';

interface UseApprovalProps {
  role: Role;
}

/**
 * Hook to handle approval actions for admin or supervisor
 */
export function useApproval({ role }: UseApprovalProps) {
  const queryClient = useQueryClient();

  return useMutation<
    BookingApprovalResponse, 
    unknown,
    { id: string; action: ApprovalAction }
  >({
    mutationFn: async ({ id, action }) => {
      if (role === 'ADMIN') return ApprovalService.adminApproval({ id, action });
      return ApprovalService.spvApproval({ id, action });
    },
    onSuccess: () => {
      // refresh pending approvals
      queryClient.invalidateQueries(['pending-approvals']);
    },
    onError: (err) => console.error(`${role} approval failed`, err),
  });
}

/**
 * Hook to fetch pending approvals
 */
export function usePendingApprovals() {
  return useQuery<BookingApprovalResponse[], unknown>({
    queryKey: ['pending-approvals'],
    queryFn: () => ApprovalService.getPendingApprovals(),
  });
}
