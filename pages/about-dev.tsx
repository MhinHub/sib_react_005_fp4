import { Avatar } from "flowbite-react";
import { NextPage } from "next";
import Layout from "@components/Layout";
import { Instagram, LinkSquare, UserSquare } from "iconsax-react";
import Link from 'next/link'

const AboutDev: NextPage = () => {
    return (
        <Layout title="About Dev">
            <main className="flex flex-col justify-center scrollbar-hide">
                <section className="w-screen h-screen justify-center">
                    <iframe src="https://embed.lottiefiles.com/animation/75758" className="absolute md:right-[25vw] md:-bottom-60 -z-10 md:w-[100vh] h-screen md:h-[80vw] md:rotate-90" />
                    <h1 className="text-5xl text-center font-bold mb-10 mt-20">About Dev</h1>
                    <div className="bg-glass !rounded-3xl py-10 px-5 w-[90vw] md:w-[40vw] border border-gray-400 border-opacity-50 mx-auto">
                        <h2 className="text-xl text-center font-medium mb-5 bg-glass-gray rounded-full px-2 w-[70vw] md:w-1/2 mx-auto">Member from Team 1</h2>
                        <Avatar
                            img="/static/photo-avatar.png"
                            rounded={true}
                            bordered={true}
                            color="purple"
                            size="lg"
                        />
                        <div className="flex flex-col justify-center items-center mt-5">
                            <p className="font-bold mb-2">Muhaemin Iskandar</p>
                            <p className="font-light text-sm">RCTN-005-001</p>
                            <p className="font-light text-sm">Universitas Hasanuddin</p>
                        </div>

                        <div className="flex justify-center items-center mt-5 gap-x-5">
                            <Link href="https://github.com/MhinHub/" target="_blank">
                                <UserSquare size={30} className="text-purple-500 mx-auto" variant="Bulk" />
                                <p className="text-purple-500 text-xs text-center">Github</p>
                            </Link>
                            <Link href="https://www.instagram.com/muhis.me/" target="_blank">
                                <Instagram size={30} className="text-purple-500 mx-auto" variant="Bulk" />
                                <p className="text-purple-500 text-xs text-center">Instagram</p>
                            </Link>
                            <Link href="https://www.linkedin.com/in/muhaemin-iskandar/" target="_blank">
                                <LinkSquare size={30} className="text-purple-500 mx-auto" variant="Bulk" />
                                <p className="text-purple-500 text-xs text-center">Linkedin</p>
                            </Link>
                        </div>
                    </div>
                </section>
                <section className="w-screen h-screen">
                    <h2 className="text-center text-2xl font-bold mb-5">
                        Project Management
                    </h2>
                    <div className="flex justify-center">
                        <iframe
                            src="https://trello.com/b/xqVl8ofw.html"
                            width="80%"
                            height="600"
                        />
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default AboutDev;