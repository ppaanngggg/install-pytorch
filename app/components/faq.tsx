export default function FAQ() {
  const qClass = "text-l font-semibold my-2";
  const aClass = "text-s text-justify my-1";
  return (
    <div className="w-full flex flex-col items-center bg-orange-100 py-8">
      <div className="flex flex-col w-8/12 max-w-4xl items-left px-8">
        <h3 className={qClass}>• Why did you build this website?</h3>
        <p className={aClass}>
          I found it hard to find the right PyTorch version for my project. I
          have to go to the official repository and search by browser, it is not
          a good experience. So I build this website to help me and others like
          me find the right PyTorch version easily.
        </p>
        <h3 className={qClass}>• CPU vs Cuda vs ROCm?</h3>
        <p className={aClass}>
          If you have no GPU or only want to use PyTorch on CPU, select CPU. If
          you have Nvidia GPU, select Cuda. If you have AMD GPU, select ROCm.
        </p>
        <h3 className={qClass}>• Which Cuda version should I choose?</h3>
        <p className={aClass}>
          If you have Nvidia GPU, you should choose the Cuda version that is
          compatible with your GPU. You can check the compatibility at Nvidia
          official website. And a easy way is to use <b>nvidia-smi</b> command
          to check. Of course, you should make sure that you have installed the
          right driver.
        </p>
        <h3 className={qClass}>• Which ROCm version should I choose?</h3>
        <p className={aClass}>
          If you have AMD GPU, you should choose the ROCm version that is
          compatible with your GPU. You can check the compatibility at AMD
          official website. And you should make sure that you have installed the
          right driver and ROCm.
        </p>
        <h3 className={qClass}>
          • I have install ROCm 6.0, but I can not find ROCm 6.0 in the list?
        </h3>
        <p className={aClass}>
          You could install ROCm 5.7 instead. However, when you use PyTorch, you
          need to set the environment variable{" "}
          <b>HSA_OVERRIDE_GFX_VERSION=10.3.0</b>.
        </p>
        <h3 className={qClass}>
          • What should I do next after I have downloaded the PyTorch wheel
          file?
        </h3>
        <p className={aClass}>
          You can install the PyTorch wheel file by using the command{" "}
          <b>
            pip install <em>your_wheel_file.whl</em>
          </b>
          . You can also copy the command from the website and paste it into
          shell and run.
        </p>
      </div>
    </div>
  );
}
