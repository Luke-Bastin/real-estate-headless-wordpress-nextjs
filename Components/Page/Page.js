import { MainMenu } from "Components/MainMenu";
import { BlockRenderer } from "Components/BlockRenderer";
import Head from "next/head";

export const Page = (props) => {
    console.log("PAGE PROPS: ", props);
    return (
    <div>
        <Head>
            <title>{props.seo?.title || props.title}</title>

            {props.seo?.metaDesc && (
                <meta name="description" content={props.seo.metaDesc} />
            )}

            {props.seo?.canonical && (
                <link rel="canonical" href={props.seo.canonical} />
            )}

            <meta property="og:title" content={props.seo?.opengraphTitle || props.seo?.title || props.title} />

            {props.seo?.opengraphDescription && (
                <meta property="og:description" content={props.seo.opengraphDescription} />
            )}

            {props.seo?.canonical && (
                <meta property="og:url" content={props.seo.canonical} />
            )}

            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary" />

            <meta
                name="twitter:title"
                content={props.seo?.twitterTitle || props.seo?.title || props.title}
            />

            {(props.seo?.twitterDescription || props.seo?.metaDesc) && (
                <meta
                name="twitter:description"
                content={props.seo?.twitterDescription || props.seo?.metaDesc}
                />
            )}
        </Head>
        <MainMenu 
            items={props.items} 
            callToActionLabel={props.callToActionLabel}
            callToActionDestination={props.callToActionDestination} 
        />
        <BlockRenderer blocks={props.blocks} />
    </div>
    );
};