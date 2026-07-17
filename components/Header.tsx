import Image from "next/image";

export default function Header() {
  const today = new Date();

  return (
    <header className="bg-white shadow-md rounded-b-3xl px-8 py-5">

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 md:flex-row md:items-center">

        {/* Logo */}
        <div className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="Universal Xports Ltd."
            width={90}
            height={90}
            className="object-contain"
          />
        </div>

        {/* Company Information */}
        <div className="flex-1">

          <h1 className="text-4xl font-bold tracking-tight text-blue-700">
            UNIVERSAL XPORTS LTD.
          </h1>

          <p className="mt-2 text-gray-700">
            📍 Shop No. XXX, 1st Floor, Chung King Mansions, Tsim Sha Tsui, Hong Kong
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-6 text-sm">

            <a
              href="tel:+85262714580"
              className="font-semibold text-blue-700 hover:underline"
            >
              📞 +852 6271 4580
            </a>

            <p className="text-gray-500">
              🕒 Updated{" "}
              {today.toLocaleDateString("en-HK", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              {" • "}
              {today.toLocaleTimeString("en-HK", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}