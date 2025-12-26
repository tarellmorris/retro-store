export const dynamic = "force-dynamic";

export default async function Home() {
  let message = "";

  try {
    const response = await fetch("http://nginx:80/api/");
    if (!response.ok) {
      console.error(response.statusText);
    }
    message = await response.text();
  } catch (e) {
    console.error(e);
  }

  return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-red-300 dark:text-purple-400">
              Updated wording from the backend: {message}
            </h1>
          </div>
        </main>
      </div>
  );
}