import Image from "next/image";

export default function Home() {
  return (
  <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
    <div className="max-w-2xl w-full text-center">
      <Image
        src="/logo.png"
        alt="Company Logo"
        width={120}
        height={120}
        className="mx-auto mb-6"
      />
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Welcome to FleetZ Management
      </h1>
        <p className="text-lg text-gray-600 mb-8">
          Streamline your company’s operational car management. Track, assign, and maintain your fleet with ease.
        </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
            href="/vehicles"
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
            >
            Book A Vehicle
            </a>
            {/* <a
            href="/drivers"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300 transition"
            >
            Manage Bookings
            </a> */}
          </div>
    </div>
  </main>
  );
}
