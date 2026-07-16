import Image from "next/image";
export default function Header() {
  const today = new Date();

  return (
    <header className="bg-white shadow-md rounded-b-3xl p-10">

      <div className="flex justify-center mb-6">
  <Image
    src="/images/logo.png"
    alt="Universal Xports Ltd."
    width={140}
    height={140}
    className="object-contain"
  />
</div>

      <h1 className="text-4xl font-bold text-center text-blue-700">
        UNIVERSAL XPORTS LTD.
      </h1>

      <p className="text-center text-base font-medium text-gray-800 mt-4">
        📍 Shop No. XXX, 1st Floor, Chung King Mansions,
        <br />
        Tsim Sha Tsui, Hong Kong
      </p>

      <p className="text-center text-base font-semibold text-blue-700 mt-2">
        📞 +852 6271 4580
      </p>

      <p className="text-center text-sm text-gray-500 mt-3">
        🕒 Last Updated: {today.toLocaleDateString("en-HK", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})}{" "}
•{" "}
{today.toLocaleTimeString("en-HK", {
  hour: "2-digit",
  minute: "2-digit",
})}
      </p>

    </header>
  );
}