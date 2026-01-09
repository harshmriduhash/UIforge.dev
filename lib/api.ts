import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Component {
  id: string;
  name: string;
  description: string;
  category: string;
  code: string;
  props?: Record<string, any>;
  preview?: string;
}

export async function fetchComponents(
  search?: string,
  category?: string,
  page = 1,
  limit = 20
): Promise<{ components: Component[]; total: number }> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const res = await fetch(`/api/components?${params}`);
  if (!res.ok) throw new Error("Failed to fetch components");
  return res.json();
}

export function useComponents(search?: string, category?: string, page = 1) {
  return useQuery({
    queryKey: ["components", search, category, page],
    queryFn: () => fetchComponents(search, category, page),
    staleTime: 5 * 60 * 1000,
  });
}

export async function createCheckoutSession(priceId: string) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId }),
  });
  if (!res.ok) throw new Error("Failed to create checkout session");
  return res.json();
}

export function useCheckout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
  });
}
