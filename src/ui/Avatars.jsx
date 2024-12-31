/* eslint-disable react/prop-types */
const Avatars = ({ gender, setPic }) => {
  const maleAvatars = [
    "https://avatar.iran.liara.run/public/20",
    "https://avatar.iran.liara.run/public/32",
    "https://avatar.iran.liara.run/public/34",
  ];
  const femaleAvatars = [
    "https://avatar.iran.liara.run/public/74",
    "https://avatar.iran.liara.run/public/83",
    "https://avatar.iran.liara.run/public/71",
  ];

  const avatars = gender === "women" ? femaleAvatars : maleAvatars;

  return (
    <div className="flex justify-around border-2 rounded-lg py-2 mb-2 shadow-lg">
      {avatars.map((avatar, index) => (
        <div key={index} className="avatar">
          <div className="max-sm:w-14 w-20 rounded-full focus-within:border-2 focus-within:border-gray-400">
            <div tabIndex="0">
              <img
                src={avatar}
                alt="avatar"
                onClick={() => setPic(avatar)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Avatars;
