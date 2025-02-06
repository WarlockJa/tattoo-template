import CustomeHeaderText from "@/components/CustomeHeaderText";
import HomeServiceCard from "@/components/Home/Services/HomeServiceCard";
import { getTranslations } from "next-intl/server";

export const runtime = "edge";

export default async function ServicesPage() {
  const [tServices, tHeaders] = await Promise.all([
    getTranslations("Services"),
    getTranslations("Headers"),
  ]);
  return (
    <section className="relative mx-auto flex h-full min-h-[min(1080px,100vh)] max-w-5xl flex-col justify-center py-4">
      <div>
        <ul>
          <div>
            <CustomeHeaderText text={tServices("tattoo")} />
            <HomeServiceCard
              dbImageName="m0daxp5j80m3mf6nk394qvda-service_tattoo.webp"
              name={tServices("tattoo").toLocaleUpperCase()}
              className="float-left m-4 max-w-xs"
              href="/services/tattoo"
            />
            <div>
              <div>
                <h2 className="text-2xl">{tServices("what_is_tattoo")}</h2>
                <p>{tServices("tattoo_is")}</p>
              </div>
              <div>
                <h2>{tServices("whats_tattoo_procedure_like")}</h2>
                <p>{tServices("tattoo_procedure_1")}</p>
                <p>{tServices("tattoo_procedure_2")}</p>
              </div>
              <div>
                <h2>{tServices("does_it_hurt_tattoo")}</h2>
                <p>{tServices("tattoo_hurt_answer")}</p>
              </div>
            </div>
          </div>

          <div>
            <CustomeHeaderText text={tServices("body_piercing")} />
            <HomeServiceCard
              dbImageName="eqy2prcq1znnwfk1mdfrzta6-service_piercing.webp"
              name={tServices("body_piercing").toLocaleUpperCase()}
              className="float-left m-4 max-w-xs"
              href="/services/body-piercing"
            />
            <div>
              <div>
                <h2>{tServices("whats_body_piercing")}</h2>
                <p>{tServices("body_piercing_1")}</p>
                <p>{tServices("body_piercing_2")}</p>
                <p>{tServices("body_piercing_3")}</p>
              </div>
              <div>
                <h2>{tServices("whats_body_piercing_procedure_like")}</h2>
                <p>{tServices("body_piercing_procedure_1")}</p>
                <p>{tServices("body_piercing_procedure_2")}</p>
              </div>
            </div>
          </div>

          <div>
            <CustomeHeaderText text={tServices("permanent_makeup")} />
            <HomeServiceCard
              dbImageName="hi69me7mamollzpoilpog9xb-service_makeup.webp"
              name={tServices("permanent_makeup").toLocaleUpperCase()}
              className="float-left m-4 max-w-xs"
              href="/services/permanent-makeup"
            />
            <div>
              <div>
                <h2>{tServices("whats_permanent_makeup")}</h2>
                <p>{tServices("permanent_makeup_is")}</p>
              </div>
              <div>
                <h2>{tServices("permanent_makeup_benefits")}</h2>
                <p>{tServices("permanent_makeup_benefits_text")}</p>
              </div>
            </div>
          </div>
        </ul>
      </div>
      <h4 className="text-center">{tHeaders("any_questions")}</h4>
    </section>
  );
}
