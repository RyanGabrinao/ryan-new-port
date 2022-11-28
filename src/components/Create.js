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
      className="relative pt-[5rem] px-2 pb-12 mb-[5rem]"
      ref={mainComponent}
      id="create-section"
    >
      <div
        className="fixed top-0 left-0 z-[5] flex w-full h-full"
        id="tile-container"
      >
        {Array.from({ length: 10 }, (_, i) => {
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
        <p className="mt-12 mb-4 font-normal text-step6">
          Fill the form below for an inquiry:
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="font-normal text-step4"
        >
          Hi! My name is
          <input
            type="text"
            className="input__text"
            placeholder="Enter your name*"
            required
            {...register("client_name", { required: true })}
          />
          and I work with
          <input
            type="text"
            className="input__text"
            placeholder="Company name type here"
            {...register("client_company")}
          />
          I am looking for a partner to help me with
          <input
            type="text"
            className="input__text"
            placeholder="Your goal type here*"
            required
            {...register("client_goal", { required: true })}
          />
          With an idea of having that completed
          <input
            type="text"
            className="input__text"
            placeholder="Date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            {...register("client_end_date")}
          />
          I am hoping to stay around a budget range of
          <select
            className="input__text invalid:text-step5 invalid:normal-case invalid:font-normal invalid:text-neutral-400"
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
          You can reach me at
          <input
            type="email"
            className="input__text"
            placeholder="name@example.com*"
            required
            {...register("client_email", { required: true })}
          />
          to start the conversation. Optionally, I am sharing more:
          <input
            type="text"
            className="input__text"
            placeholder="Product details type here"
            {...register("client_product")}
          />
          <div className="mt-7">
            <button
              type="submit"
              className="relative flex items-center justify-between py-3 pl-6 pr-6 leading-none uppercase bg-orange-900 rounded-full text-rg-white text-step5 group"
            >
              <span className="inline-block mr-8">Submit</span>
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
