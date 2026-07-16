import Image from "next/image";
export default function Header() {
  const today = new Date();

  return (
    <header className="bg-white shadow-md rounded-b-3xl py-6 px-10">

      <div className="flex justify-center mb-6">
  <Image
  src="/images/logo.png"
  alt="Universal Xports Ltd."
  width={160}
  height={160}
  className="object-contain"
 />
</div>

      <h1 className="mt-2 text-5xl font-bold text-center text-blue-700">
        UNIVERSAL XPORTS LTD.
      </h1>

      <p className="mt-3 text-center text-base font-medium text-gray-800">
        📍 Shop No. XXX, 1st Floor, Chung King Mansions, Tsim Sha Tsui, Hong Kong
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm">

  <a
  href="tel:+85262714580"
  className="font-semibold text-blue-700 hover:underline"
>
  📞 +852 6271 4580
</a>

  <p className="text-gray-500">
    🕒 Last Updated:{" "}
    {today.toLocaleDateString("en-HK", {
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

</div>

    </header>
  );
}