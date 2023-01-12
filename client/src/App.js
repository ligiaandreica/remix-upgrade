import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

const fetchWithAuth = async (url, config) => {
  const headers = Object.assign(
    {},
    { Authorization: `Bearer abc` },
    config?.headers
  );
  config = {
    ...(config ?? {}),
    headers,
  };

  return await window.fetch(url, config);
};

const queryKey = "getData";
const getRemixData = async () => {
  const response = await fetchWithAuth(`http://localhost:3000/api/data`);

  if (!response.ok) {
    const { status, statusText } = response;
    console.error("Oops", statusText, status);
    throw new Error("Oops");
  }

  return response.json();
};

function Page() {
  const { data, isInitialLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: getRemixData,
  });
  console.log("Remix data", data, isInitialLoading);

  return <div />;
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
  );
};

export default App;
