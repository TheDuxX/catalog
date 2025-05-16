"use client";

import React, { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, GripVertical, Save, PlusCircle } from "lucide-react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  DragOverlay,
  DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { AlertCircle } from "lucide-react";
import { Switch } from "@/app/_components/ui/switch";
import { Button } from "@/app/_components/ui/button";
import { MyDropzone, useBannersViewModel } from "../_viewmodels/useBanners";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/ui/alert";
import { cn } from "@/app/_lib/utils";
import { BannerProps } from "../_services/banners-service";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";

// Componente para exibir um único banner (item arrastável)
const SortableBannerItem = ({
  banner,
  onUpdateVisibility,
  onDelete,
}: {
  banner: BannerProps;
  onUpdateVisibility: (id: string, isVisible: boolean) => void;
  onDelete: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: banner.id,
      data: { ...banner }, // Passa os dados do banner para o contexto de arrasto
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "none",
    transition,
  };

  const handleSwitchChange = (checked: boolean) => {
    onUpdateVisibility(banner.id, checked);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete(banner.id);
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-white p-4 rounded-lg border border-white/10 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] space-y-4 data-id ${
        banner.is_visible ? "" : "opacity-50"
      }`}
      data-id={banner.id}
    >
      {/* Área de arrastar */}
      <div className="flex items-center justify-end">
        <div
          className="absolute left-2 top-2 cursor-grab group-hover:cursor-grabbing"
          {...listeners}
          {...attributes}
        >
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-gray-400" />
            <h3 className="text-lg">{banner.name}</h3>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Switch de Visibilidade */}
            <div
              className="flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <span
                className={`text-sm  ${
                  banner.is_visible ? "text-green-500" : "text-red-400"
                }`}
              >
                {banner.is_visible ? "Ativo" : "Inativo"}
              </span>
              <Switch
                checked={banner.is_visible}
                onCheckedChange={handleSwitchChange}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-400"
              />
            </div>
            {/* Botão de Excluir */}
            <Button
              variant="destructive"
              size="icon"
              onClick={handleDeleteClick}
              className="rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Imagem do Banner */}
      <div className="relative w-full max-h-[200px] min-h-[100px] rounded-md overflow-hidden bg-white">
        <Image
          fill
          src={banner.image_url}
          alt={banner.name}
          className="object-cover object-center"
        />
      </div>

      {/* Nome e Controles */}
    </motion.div>
  );
};

const BannerList = () => {
  const {
    banners,
    isLoading,
    error,
    form,
    isDialogOpen,
    setIsDialogOpen,
    handleUpdateVisibility,
    handleUpdateOrder,
    handleDeleteBanner,
    handleCreateBanner,
    handleSaveBanners,
    isDirty,
  } = useBannersViewModel();

  const [draggedId, setDraggedId] = React.useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: (event: KeyboardEvent) => {
        const target = event.target as HTMLElement;
        if (!target) return undefined;
        const element = target.closest("[data-id]");
        if (!element) return undefined;
        const rect = element.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        } as { x: number; y: number };
      },
    })
  );
  const handleDragEnd = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
        const oldIndex = banners.findIndex((banner) => banner.id === active.id);
        const newIndex = over
          ? banners.findIndex((banner) => banner.id === over.id)
          : banners.length;

        // Cria uma cópia mutável do array
        const newBanners = [...banners];
        // Remove o item da posição antiga
        const [movedItem] = newBanners.splice(oldIndex, 1);
        // Insere o item na nova posição
        newBanners.splice(newIndex, 0, movedItem);

        // Atualiza a ordem de todos os banners no array
        const finalBanners = newBanners.map((banner, index) => ({
          ...banner,
          order: index,
        }));

        // Atualiza a ordem no banco de dados
        finalBanners.forEach((banner, index) => {
          if (banner.id === active.id) {
            handleUpdateOrder(banner.id, index);
          }
        });
      }
      setDraggedId(null);
    },
    [banners, handleUpdateOrder]
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-white/5 p-4 rounded-lg border border-white/10 animate-pulse"
          >
            <div className="w-full aspect-video bg-gray-700 rounded-md mb-4" />
            <div className="h-6 bg-gray-700 rounded w-2/3 mb-2" />
            <div className="h-4 bg-gray-800 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>
          {error.message || "Ocorreu um erro ao carregar os banners."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gerenciar Banners</h2>
        <div className="flex gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Novo Banner
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar Novo Banner</DialogTitle>
                <DialogDescription>
                  Preencha os campos abaixo para criar um novo banner.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleCreateBanner)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do banner" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Imagem</FormLabel>
                        <FormControl>
                          <MyDropzone
                            onChange={field.onChange}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Criar</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Button
            onClick={handleSaveBanners}
            variant="default"
            disabled={!isDirty} // Desabilita o botão se não houver alterações
            className={cn(
              isDirty
                ? "bg-green-500 text-white"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            )}
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={(event) => setDraggedId(event.active.id as string)}
      >
        <SortableContext items={banners.map((banner) => banner.id)}>
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {banners.map((banner) => (
                <SortableBannerItem
                  key={banner.id}
                  banner={banner}
                  onUpdateVisibility={(id, isVisible) =>
                    handleUpdateVisibility(id, isVisible)
                  }
                  onDelete={handleDeleteBanner}
                />
              ))}
            </div>
          </AnimatePresence>
        </SortableContext>
        <DragOverlay>
          {draggedId ? (
            <SortableBannerItem
              banner={banners.find((banner) => banner.id === draggedId)!}
              onUpdateVisibility={(id, isVisible) =>
                handleUpdateVisibility(id, isVisible)
              }
              onDelete={handleDeleteBanner}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default BannerList;
