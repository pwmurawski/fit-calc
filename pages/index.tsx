import { NextPageWithLayout } from 'pages/_app';
import Head from 'next/head';
import Image from 'next/image';
import img from 'public/assets/2.png';
import img2 from 'public/assets/2.f4b799c.gif';
import { MainLayout } from 'components/Layouts/MainLayout/MainLayout';

const Home: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>FitCalc | Home</title>
            </Head>
            <HomeView />
        </>
    );
};

Home.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

export default Home;

function HomeView() {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '100px',
                    padding: '30px',
                    maxWidth: '1600px',
                    width: '100%',
                    height: '680px',
                    zIndex: '-1',
                    backgroundImage: 'url("./assets/1.png")',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    objectPosition: 'center',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', width: '320px', height: '100%' }}>
                    <Image
                        src={img}
                        alt="tel"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        maxWidth: '620px',
                        width: '100%',
                        height: '100%',
                        gap: '20px',
                    }}
                >
                    <h2 style={{ fontSize: '60px', fontWeight: 400, margin: 0 }}>
                        Najprostszy kalkulator kalorii i dieta na świecie
                    </h2>
                    <p style={{ fontSize: '24px', fontWeight: 400, margin: 0 }}>
                        Z nami możesz schudnąć, utrzymać obecną sylwetkę lub nabrać masy
                    </p>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '100px',
                    padding: '100px',
                }}
            >
                <h2
                    style={{
                        maxWidth: '500px',
                        width: '100%',
                        fontSize: '60px',
                        fontWeight: 400,
                        margin: 0,
                        textAlign: 'right',
                    }}
                >
                    Z Fitatu wszystko jest proste
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', width: '320px' }}>
                    <Image
                        src={img2}
                        alt="tel"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '1140px' }}>
                <h2
                    style={{
                        textAlign: 'center',
                        fontSize: '60px',
                        fontWeight: 400,
                        margin: 0,
                    }}
                >
                    Poznaj funkcje, których codziennie potrzebujesz
                </h2>
                <h3
                    style={{
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: 600,
                        margin: '100px 0',
                    }}
                >
                    WAŻNE FUNKCJE
                </h3>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '50px 70px',
                        gap: '70px',
                        backgroundColor: '#f7f9f9',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', textAlign: 'center' }}>
                        <p style={{ fontSize: '18px', fontWeight: 700, margin: '0 20px' }}>
                            Komunikat o przekroczeniu celów
                        </p>
                        <Image
                            src={img}
                            alt="tel"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', textAlign: 'center' }}>
                        <p style={{ fontSize: '18px', fontWeight: 700, margin: '0 20px' }}>Własne cele kaloryczne</p>
                        <Image
                            src={img}
                            alt="tel"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', textAlign: 'center' }}>
                        <p style={{ fontSize: '18px', fontWeight: 700, margin: '0 20px' }}>
                            Komunikat o przekroczeniu celów
                        </p>
                        <Image
                            src={img}
                            alt="tel"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '1140px' }}>
                <h3
                    style={{
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: 600,
                        margin: '100px 0',
                    }}
                >
                    WAŻNE FUNKCJE
                </h3>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '50px 70px',
                        gap: '70px',
                        backgroundColor: '#f7f9f9',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', textAlign: 'center' }}>
                        <p style={{ fontSize: '18px', fontWeight: 700, margin: '0 20px' }}>
                            Komunikat o przekroczeniu celów
                        </p>
                        <Image
                            src={img}
                            alt="tel"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', textAlign: 'center' }}>
                        <p style={{ fontSize: '18px', fontWeight: 700, margin: '0 20px' }}>Własne cele kaloryczne</p>
                        <Image
                            src={img}
                            alt="tel"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', textAlign: 'center' }}>
                        <p style={{ fontSize: '18px', fontWeight: 700, margin: '0 20px' }}>
                            Komunikat o przekroczeniu celów
                        </p>
                        <Image
                            src={img}
                            alt="tel"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </div>
                </div>
            </div>
            <footer style={{ backgroundColor: '#f7f9f9', marginTop: '100px', width: '100%', textAlign: 'center' }}>
                <p>© FitCalc {new Date().getFullYear()}. Wszelkie prawa zastrzeżone</p>
            </footer>
        </>
    );
}
