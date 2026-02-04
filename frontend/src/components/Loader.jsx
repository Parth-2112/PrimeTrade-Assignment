const Loader = () => {
  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 animate-spin border-4 border-(--primary-color) border-t-transparent rounded-full" />
        <div className="absolute inset-2 animate-spin border-2 border-(--secondary-color) border-t-transparent rounded-full" style={{transform : "rotate(180deg)"}}/>
      
      </div>
    </div>
  );
}

export default Loader