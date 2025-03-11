"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();

  function onSubmit(data: FormInput) {
    window.alert(JSON.stringify(data, null, 2));
    return true;
  }

  return (
    <div className="flex h-full items-center justify-center gap-12">
      <img src="/undraw_developer.png" alt="logo" className="h-56 w-auto" />
      <div>
        <div>
          <h1 className="text-2xl font-semibold">
            Link your Github repository
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the URL of your repository to link to GitMind
          </p>
        </div>
        <div className="h-4"></div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("projectName", { required: true })}
              placeholder="Project name"
              required
            />
            <div className="h-4"></div>
            <Input
              {...register("repoUrl", { required: true })}
              placeholder="Github URL"
              required
              type="url"
            />
            <div className="h-4"></div>

            <Input
              {...register("githubToken")}
              placeholder="Github Token (Optional)"
            />
            <div className="h-4"></div>

            <Button type="submit">Create Project</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
