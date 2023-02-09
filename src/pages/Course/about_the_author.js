import React from 'react'

function AboutAuthor() {
    return (
        <div className="py-8 flex flex-col">
        <p className="">Instructor</p>
        <div className="mt-10 flex flex-col md:px-36">
          <div className="flex items-center ">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary-700">
              <p className="text-white font-bold text-lg">SL</p>
            </div>
            <div className="ml-4">
              <p className="font-bold text-lg text-black">
                Sebastian Livingstone
              </p>
              <p>Senior Software Engineer</p>
            </div>
          </div>
          <div className="mt-10">
            <p className="font-bold text-black">About the author</p>
            <p className="md:mt-5">
              Sebastian is a Freelance Android developer based in Berlin. He
              is passionate about mobile dev, machine learning, but most
              importantly, he's passionate about teaching and learning.
            </p>
          </div>
        </div>
      </div>
    
    )
}

export default AboutAuthor
