"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BannerProps,
  bulkUpdate as updateBanners,
  create as createBanner,
  getBanners,
  remove as removeBanner,
  create,
} from "../_services/banners-service";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useBannersViewModel = () => {
  const queryClient = useQueryClient();
  const [isDirty, setIsDirty] = useState(false); // Estado para controlar se há alterações

  // Busca os banners
  const {
    data: banners,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  // Estado local para armazenar os banners (mutável)
  const [localBanners, setLocalBanners] = useState<BannerProps[]>([]);

  // Inicializa o estado local quando os banners são carregados do servidor
  useEffect(() => {
    if (banners) {
      setLocalBanners([...banners].sort((a, b) => a.order - b.order));
    }
  }, [banners]);

  // Mutações para criar, deletar e atualizar banners
  const createBannerMutation = useMutation({
    mutationFn: (data: { name: string; image: File }) => create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner criado com sucesso.");
      setIsDirty(false);
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar banner: ${error.message}`);
    },
  });

  const deleteBannerMutation = useMutation({
    mutationFn: (id: string) => removeBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner deletado com sucesso.");
      setIsDirty(false);
    },
    onError: (error: any) => {
      toast.error(`Erro ao deletar banner: ${error.message}`);
    },
  });

  const bulkUpdateBannersMutation = useMutation({
    mutationFn: (banners: BannerProps[]) => updateBanners(banners),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Alterações salvas com sucesso.");
      setIsDirty(false);
    },
    onError: (error: any) => {
      toast.error(`Erro ao salvar alterações: ${error.message}`);
    },
  });

  // Funções para atualizar o estado local e marcar como dirty
  const handleUpdateVisibility = useCallback(
    (id: string, isVisible: boolean) => {
      setLocalBanners((prevBanners) =>
        prevBanners.map((banner) =>
          banner.id === id ? { ...banner, is_visible: isVisible } : banner
        )
      );
      setIsDirty(true); // Marca como alterado
    },
    []
  );

  const handleUpdateOrder = useCallback((id: string, newOrder: number) => {
    setLocalBanners((prevBanners) => {
      const updatedBanners = [...prevBanners];
      const movedItemIndex = updatedBanners.findIndex((b) => b.id === id);

      if (movedItemIndex === -1) return prevBanners;

      // Remove o item da sua posição antiga
      const [movedItem] = updatedBanners.splice(movedItemIndex, 1);
      // Insere o item na nova posição
      updatedBanners.splice(newOrder, 0, movedItem);

      // Atualiza o order de todos os banners no array
      const finalBanners = updatedBanners.map((banner, index) => ({
        ...banner,
        order: index,
      }));
      return finalBanners;
    });
    setIsDirty(true);
  }, []);

  const handleDeleteBanner = useCallback(
    (id: string) => {
      setLocalBanners((prevBanners) =>
        prevBanners.filter((banner) => banner.id !== id)
      );
      deleteBannerMutation.mutate(id);
      setIsDirty(true); // Marcar como dirty mesmo na exclusão para habilitar o botão de salvar
    },
    [deleteBannerMutation]
  );

  const bannerFormSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    image_url: z.any().refine((file) => file instanceof File, {
      message: "Uma imagem válida é obrigatória.",
    }),
  });

  // React Hook Form
  type BannerFormValues = z.infer<typeof bannerFormSchema>;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      name: "",
      image_url: undefined,
    },
  });

  const handleCreateBanner = useCallback(() => {
    const values = form.getValues();
    const file = values.image_url;

    if (!file) return toast.error("Imagem não selecionada.");

    try {
      createBannerMutation.mutate(
        { name: values.name, image: file },
        {
          onSuccess: () => {
            refetch(); // Atualiza lista após criação
            form.reset();
          },
        }
      );
    } catch (error) {
      console.error("Erro ao criar banner:", error);
    } finally {
      setIsDialogOpen(false);
    }
  }, [createBannerMutation, form, refetch]);

  const handleSaveBanners = () => {
    if (localBanners) {
      console.log("Enviando para a API:", localBanners);
      bulkUpdateBannersMutation.mutate(localBanners);
    }
  };

  return {
    banners: localBanners, // Retorna o estado local, que é mutável
    isLoading,
    error,
    refetch,
    form,
    isDialogOpen,
    setIsDialogOpen,
    handleUpdateVisibility,
    handleUpdateOrder,
    handleDeleteBanner,
    handleCreateBanner,
    handleSaveBanners,
    isDirty,
  };
};

import { useDropzone } from "react-dropzone";
import { Plus } from "lucide-react";

type MyDropzoneProps = {
  onChange: (file: File) => void;
  value?: File;
};

export function MyDropzone({ onChange, value }: MyDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        onChange(file);
        setPreview(URL.createObjectURL(file));
      }
    },
    accept: { "image/*": [] },
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  useEffect(() => {
    if (value) {
      setPreview(URL.createObjectURL(value));
    }
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [value]);

  return (
    <div
      {...getRootProps()}
      className={`border ${
        preview ? "border-solid" : "border-dashed"
      } w-full min-h-[200px] flex items-center justify-center p-4 rounded cursor-pointer`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt="preview" className="w-full h-auto" />
      ) : (
        <div className="flex flex-col items-center w-2/3 text-black/50">
          <Plus className="stroke-1" />
          <p className="text-wrap text-center">
            Arraste uma imagem ou clique para selecionar
          </p>
        </div>
      )}
    </div>
  );
}
