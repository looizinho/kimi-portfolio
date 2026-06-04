import { z } from 'zod';

export const ProjectSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  subtitle: z.string().optional(),
  description: z.string().min(1, 'Descrição é obrigatória'),
  image: z.string().url('Imagem deve ser uma URL válida'),
  tags: z.array(z.string()).optional().default([]),
  link: z.string().url().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ProjectsDataSchema = z.object({
  intro: z.string().optional(),
  projects: z.array(ProjectSchema),
});

export type ProjectsData = z.infer<typeof ProjectsDataSchema>;

export const GalleryItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  image: z.string().url('Imagem deve ser uma URL válida'),
  description: z.string().optional(),
  date: z.string().optional(),
});

export type GalleryItem = z.infer<typeof GalleryItemSchema>;

export const GalleryDataSchema = z.object({
  intro: z.string().optional(),
  items: z.array(GalleryItemSchema),
});

export type GalleryData = z.infer<typeof GalleryDataSchema>;

export const WorkItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  client: z.string().optional(),
  description: z.string(),
  image: z.string().url('Imagem deve ser uma URL válida'),
  category: z.string().optional(),
  date: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
});

export type WorkItem = z.infer<typeof WorkItemSchema>;

export const WorksDataSchema = z.object({
  intro: z.string().optional(),
  works: z.array(WorkItemSchema),
});

export type WorksData = z.infer<typeof WorksDataSchema>;

export function validateData<T>(schema: z.ZodSchema<T>, data: unknown, dataName: string): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join('\n');
      console.error(`Erro ao validar ${dataName}:\n${messages}`);
      throw new Error(`Dados inválidos em ${dataName}. Verifique o console.`);
    }
    throw error;
  }
}
