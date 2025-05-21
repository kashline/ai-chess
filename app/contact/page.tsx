import Button from "@/app/ui/Button";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="text-center" style={{ height: "calc(100vh - 48px)" }}>
      <div className="h-[35%]">
        <div className="h-full flex">
          <div className="my-auto mx-auto">
            <p className="pb-8">
              Having a problem or want something added to AI chess? Click below
              to contact us!
            </p>
            <Button>
              <Link href="mailto:aichess@gmail.com?subject=Feature/Bug">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="h-[35%]">
        <div className="flex">
          <div className="my-6 border-t border-gunmetal w-[80%] mx-auto" />
        </div>
        <h1 className="text-lavendar-blush">Our team</h1>
        <div className="flex">
          <Image
            className="mx-auto"
            alt="adorable cat in a chair"
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/hobbes-chair.jpg`}
            width={250}
            height={1}
          />
        </div>
        <h1 className="text-sm text-lavendar-blush">Hobbes, Lead developer</h1>
      </div>
    </div>
  );
}
