import ProfileButton from "@/app/ui/tmp/ProfileButton";

export default function Topbar() {
  return (
    <div className="h-10 bg-black text-white">
      <div className="flex h-full">
        <p className="mx-auto my-auto">AI Chess</p>
        <div>
          <ProfileButton/>
        </div>
      </div>

    </div>
  );
}
