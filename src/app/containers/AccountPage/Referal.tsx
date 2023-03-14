import CommonLayout from "./CommonLayout";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import img from "images/hero-right-2.png"


const Referal = () => {
    return (
        <div>
            <CommonLayout>
                <h2 className="text-3xl font-semibold mx-auto items-center">Referal</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 max-w mb-5"></div>
                <div className="pt-1 pb-1 bg-gray-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center">
                    <div className="space-y-24 mb-24 mt-5 lg:space-y-12 lg:mb-28 mx-auto">
                        
                            {/* HEADING */}



                            <div className="max-w-md">
                                <NcImage
                                    src={img}
                                    className=""
                                />
                                <span className=" font-semibold text-4xl flex items-center justify-center my-5">Referal Code</span>
                                <br />

                                <div className="pt-10 flex items-center justify-center">
                                    <ButtonPrimary>Invite Friends</ButtonPrimary>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </CommonLayout>
        </div>
    );
};

export default Referal;
