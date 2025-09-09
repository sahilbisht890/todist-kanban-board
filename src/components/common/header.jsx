const  Header = ({ 
  title, 
  description, 
  titleClassName = "", 
  descClassName = "", 
  containerClassName = "" 
}) => {
  return (
    <div className={`text-center mb-14 max-w-3xl mx-auto ${containerClassName}`}>
      <h1 className={`text-3xl text-[#4a5c54] font-extrabold sm:text-4xl lg:text-5xl animate-fade-in ${titleClassName}`}>
        {title}
      </h1>
      {description && (
        <p className={`text-base text-gray-700 mt-6 sm:mt-8 sm:text-lg lg:text-xl ${descClassName}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export default Header;
