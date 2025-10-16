const PartnershipBanner = ({ partner }) => {
  return (
    <a href={partner.url} target="_blank" rel="noopener noreferrer">
      <div className="w-full py-2 px-4 border border-gray-300 bg-blue-50 border-1 mb-4 rounded-lg flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-0">
        <div className="flex flex-col lg:text-left text-center">
          <h2 className="text-xs lg:text-lg">In Partnership With</h2>
          <h1 className="lg:text-xl text-base font-semibold">{partner.name}</h1>
        </div>
        <img src={partner.logoUrl} alt={partner.name} className="lg:w-[20%] w-[50%]" />
      </div>
    </a>
  );
};

export default PartnershipBanner;
