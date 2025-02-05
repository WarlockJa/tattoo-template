import CustomeHeaderText from "@/components/CustomeHeaderText";
import HomeServiceCard from "@/components/Home/Services/HomeServiceCard";

export const runtime = "edge";

export default function ServicesPage() {
  return (
    <section className="relative mx-auto flex h-full min-h-[min(1080px,100vh)] max-w-5xl flex-col justify-center py-4">
      <div>
        <ul>
          <div>
            {/* TODO translate */}
            <CustomeHeaderText text={"Tattoo"} />
            <HomeServiceCard
              dbImageName="m0daxp5j80m3mf6nk394qvda-service_tattoo.webp"
              // TODO translate
              name="TATTOO"
              className="float-left m-4 max-w-xs"
              href="/services/tattoo"
            />
            <div>
              <div>
                <h2 className="text-2xl">What is a Tattoo?</h2>
                <p>
                  A tattoo is a permanent form of body art. A tattoo design is
                  made by puncturing the top layer of the skin with needles and
                  injecting ink, dyes, and pigments into the deeper layers.
                </p>
              </div>
              <div>
                <h2>What&apos;s the Procedure Like?</h2>
                <p>
                  The tattoo artist will wash his or her hands with
                  antibacterial soap and water and wear clean, fresh gloves (and
                  possibly a surgical mask) to ensure a safe and clean
                  environment. The area which will be tattooed is washed with
                  soap and shaved, if necessary before the artist draws or
                  stencils the design on your skin.
                </p>
                <p>
                  Once you are happy with the design, the area is cleaned once
                  more, and a thin layer of ointment is applied. The actual
                  process of tattooing normally begins with outlines and moves
                  on from there. The artist may use different needles during the
                  process depending upon the desired design, and the style of
                  the artist. Any fluids from the tattoo are wiped away with a
                  sterile and disposable gauze or towel. Once the tattoo is
                  finished the area is cleaned once more and a sterile bandage
                  is applied.
                </p>
              </div>
              <div>
                <h2>Does It Hurt to Get a Tattoo?</h2>
                <p>
                  Getting a tattoo feels different for everyone. The pain will
                  vary in type and intensity depending on your pain threshold,
                  the location of the tattoo, and the type of tattoo you are
                  getting.
                </p>
              </div>
            </div>
          </div>

          <div>
            {/* TODO translate */}
            <CustomeHeaderText text={"Body Piercing"} />
            <HomeServiceCard
              dbImageName="eqy2prcq1znnwfk1mdfrzta6-service_piercing.webp"
              // TODO translate
              name="BODY PIERCING"
              className="float-left m-4 max-w-xs"
              href="/services/body-piercing"
            />
            <div>
              <div>
                <h2>What Is a Body Piercing?</h2>
                <p>
                  A piercing is a hole or puncture of sorts made by a needle
                  through a layer of tissue that jewelry is able to fit through
                  and safely remain while the piercing heals. Many people pierce
                  their noses, ears, lips, or naval, but piercing comes in many
                  forms and styles from oral piercings, to surface anchor pieces
                  embedded into the skin.
                </p>
                <p>
                  If you are 18 years of age or older please bring a valid
                  government-issued photo ID such as a state ID, driver’s
                  license, or passport. A learner’s permit is not a valid ID.
                </p>
                <p>
                  If you are a minor (14-17 yrs old) we require your birth
                  certificate and one of your parent’s valid photo IDs. For
                  guardians of minors, we require a court-issued statement that
                  you are the legal guardian.
                </p>
              </div>
              <div>
                <h2>What&apos;s the Procedure Like?</h2>
                <p>
                  The licensed piercer will wash his or her hands with
                  antibacterial soap and water and wear clean, fresh gloves to
                  ensure a clean and sterile environment. The area to be pierced
                  (except for the tongue which is cleaned with a form of
                  Listerine) is cleaned with alcohol or another type of
                  antiseptic. All needles and equipment used are fully
                  sterilized prior to the procedure.
                </p>
                <p>
                  Your skin is then punctured with a very sharp, sterile,
                  single-use needle, and the sterile jewelry is then placed into
                  the hole created. The piercing is then cleaned of any blood,
                  and you will receive aftercare instructions.
                </p>
              </div>
            </div>
          </div>

          <div>
            {/* TODO translate */}
            <CustomeHeaderText text={"Permanent Makeup"} />
            <HomeServiceCard
              dbImageName="hi69me7mamollzpoilpog9xb-service_makeup.webp"
              // TODO translate
              name="PERMANENT MAKEUP"
              className="float-left m-4 max-w-xs"
              href="/services/permanent-makeup"
            />
            <div>
              <div>
                <h2>What is Permanent Makeup?</h2>
                <p>
                  Permanent makeup is a form of cosmetic tattooing in which a
                  tattoo machine is used to inject pigment and ink into the skin
                  to change the coloration of the desired area. Permanent makeup
                  artists have all the skills of the average makeup artist and
                  are able to produce the same look as real makeup, but with
                  permanent results. Eyeliner, color enhancement of skin on the
                  face, eyelids, lips, and eyebrows are common for permanent
                  makeup, but we also offer many other services to make you look
                  and feel your best. Please contact us for more information,
                  specifics, and availability.
                </p>
              </div>
              <div>
                <h2>Permanent Makeup Beauty Benefits</h2>
                <p>
                  The most obvious beauty benefit to permanent makeup is waking
                  up every day with your face always “on”. You can go for a
                  swim, exercise, shower and wake up still looking put together
                  and ready to go. You never have to take time to do your makeup
                  or worry about taking it off. For many, it is a great way to
                  free up precious time.
                </p>
              </div>
            </div>
          </div>
        </ul>
      </div>
      <h4 className="text-center">
        If you have any questions at all, our talented artists will be more than
        happy to assist you, and all consultations are free.{" "}
      </h4>
    </section>
  );
}
