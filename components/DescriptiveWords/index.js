import Magnet from "../Magnet/index";

const DescriptiveWords = () => {
    const words = [
        "Creative",
        "Passionate",
        "Innovative",
        "Dedicated",
        "Curious",
        "Adaptable",
        "Detail-oriented",
        "Problem-solver",
    ];

    return (
        <div className="flex flex-wrap justify-center gap-4 py-8">
            {words.map((word, index) => (
                <Magnet
                    key={index}
                    magnetStrength={1.5}
                    padding={50}
                    wrapperClassName="text-lg font-medium"
                    innerClassName="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                    {word}
                </Magnet>
            ))}
        </div>
    );
};

export default DescriptiveWords;
