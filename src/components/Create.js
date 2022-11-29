import { useRef } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { useIsomorphicLayoutEffect } from "../hooks/useIsoEffect";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Create = () => {
  const mainComponent = useRef();
  const formMethods = useForm();
  const { register, handleSubmit, reset } = formMethods;

  const onSubmit = (data, e) => {
    e.preventDefault();

    const myPromise = emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        data,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
          toast.error(
            "There was an error on submitting your inquiry. Please refresh and start again."
          );
        }
      );

    toast.promise(myPromise, {
      loading: "Submitting form...",
      success: "Submitted",
      error: "Error! Please try again.",
    });

    reset();
  };

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.batch(".tile", {
        onEnter: (batch) =>
          gsap.to(batch, {
            rotateY: 90,
            stagger: { each: 0.2 },
            scrollTrigger: {
              trigger: mainComponent.current,
              start: "top 50%",
              end: "top top+=100",
              scrub: 1,
            },
          }),
      });

      gsap.from("#create-section-content-container", {
        // yPercent: 10,
        opacity: 0,
        duration: 0.7,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: mainComponent.current,
          start: "top 35%",
          toggleActions: "play none none reverse",
        },
      });
    }, mainComponent);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative px-2 lg:max-w-[75rem] h-screen lg:mx-auto flex flex-col justify-center items-center"
      ref={mainComponent}
      id="create-section"
    >
      <div
        className="fixed top-0 left-0 z-[5] flex w-full h-full"
        id="tile-container"
      >
        {Array.from({ length: 20 }, (_, i) => {
          return (
            <div key={i} className="w-full h-screen bg-main-bg tile"></div>
          );
        })}
      </div>
      <div
        className="relative z-10 text-rg-white"
        id="create-section-content-container"
      >
        <h2 className="font-bold leading-tight text-step_4 font-neuehaas">
          Let&apos;s Work
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col font-normal text-step4"
        >
          <p className="mt-12 mb-4 italic font-normal opacity-75 text-step6">
            Fill the form below for an inquiry:
          </p>
          <div className="lg:flex line-1">
            <span className="inline-block whitespace-nowrap">
              Hi! My name is
            </span>
            <input
              type="text"
              className="lg:mx-4 input__text lg:placeholder:text-base"
              placeholder="Enter your name*"
              required
              {...register("client_name", { required: true })}
            />
            <span className="inline-block whitespace-nowrap">
              and I work with
            </span>

            <input
              type="text"
              className="input__text lg:mx-4 lg:placeholder:text-base"
              placeholder="Company name type here"
              {...register("client_company")}
            />
          </div>
          <div className="line-2 lg:flex">
            <span className="inline-block whitespace-nowrap">
              I am looking for a partner to help me with
            </span>

            <input
              type="text"
              className="input__text lg:mx-4 lg:placeholder:text-base"
              placeholder="Your goal type here*"
              required
              {...register("client_goal", { required: true })}
            />
          </div>
          <div className="lg:flex line-3">
            <span className="inline-block whitespace-nowrap">
              With an idea of having that completed
            </span>
            <input
              type="text"
              className="input__text lg:mx-4 lg:placeholder:text-base"
              placeholder="Date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              {...register("client_end_date")}
            />
          </div>
          <div className="lg:flex line-4">
            <span className="inline-block whitespace-nowrap">
              I am hoping to stay around a budget range of
            </span>
            <select
              className="input__text invalid:text-step5 invalid:normal-case invalid:font-normal invalid:text-neutral-400 lg:placeholder:text-base lg:mx-4"
              required
              {...register("client_budget", { required: true })}
            >
              <option value="" disabled hidden>
                Choose a budget*
              </option>
              <option value="Under 2k" className="option">
                Under $2K
              </option>
              <option value="2k-5k" className="option">
                $2K - $5K
              </option>
              <option value="5k-10k" className="option">
                $5K - $10K
              </option>
              <option value="Over 10k" className="option">
                Over $10K
              </option>
            </select>
          </div>
          <div className="lg:flex line-5">
            <span className="inline-block whitespace-nowrap">
              You can reach me at
            </span>
            <input
              type="email"
              className="input__text lg:mx-4 lg:placeholder:text-base"
              placeholder="name@example.com*"
              required
              {...register("client_email", { required: true })}
            />
            <span className="hidden lg:inline-block whitespace-nowrap">
              to start the conversation.
            </span>
          </div>
          <div className="lg:flex line-6">
            {/* <span className="inline-block mr-1 lg:invisible">
              to start the conversation.
            </span> */}
            <span className="inline-block whitespace-nowrap">
              Optionally, I am sharing more:
            </span>
            <input
              type="text"
              className="input__text lg:mx-4 lg:placeholder:text-base"
              placeholder="Product details type here"
              {...register("client_product")}
            />
          </div>
          <div className="flex justify-end mt-7">
            <button
              type="submit"
              className="relative flex items-center justify-between px-6 py-3 leading-none uppercase bg-orange-900 rounded-full text-rg-white text-step5 group"
            >
              <span className="inline-block mr-8 lg:text-base">Submit</span>
              <div
                className="absolute w-2 h-2 origin-center bg-rg-white rounded-full scale-[1] right-4 group-hover:scale-[3] duration-200 ease-in-out"
                aria-hidden={true}
              ></div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Create;

const Form = ({ children, handleSubmit }) => {
  return <form onSubmit={handleSubmit}></form>;
};

const FormInput = ({ cn = "" }) => {
  return <input className={`input__text ${cn}`} />;
};
