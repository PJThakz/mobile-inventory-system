export default function Header() {
  const today = new Date();

  return (
    <header className="bg-white shadow-sm p-8 mb-8">

      <h1 className="text-4xl font-bold text-center text-blue-700">
        UNIVERSAL XPORTS LTD.
      </h1>

      <p className="text-center text-sm text-gray-500 mt-2">
        Last Updated: {today.toLocaleString()}
      </p>

    </header>
  );
}