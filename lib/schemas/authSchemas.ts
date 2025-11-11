import { z } from "zod";

/**
 * 🔒 Reglas base
 * Estas validaciones se reutilizan en los formularios.
 */

// Nombre: mínimo 2 caracteres
export const nameSchema = z
  .string()
  .min(2, "El nombre debe tener al menos 2 caracteres")
  .max(50, "El nombre no debe superar los 50 caracteres");

// Correo electrónico válido
export const emailSchema = z
  .string()
  .email("El correo electrónico no es válido");

// Contraseña: mínimo 8 caracteres, al menos una mayúscula y un número
export const passwordSchema = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
  .regex(/\d/, "Debe contener al menos un número");

/**
 * 🧩 Validación de confirmación de contraseña
 * Esta función genera un esquema para comparar dos contraseñas.
 */
export const createConfirmPasswordSchema = (password: string) =>
  z
    .string()
    .min(1, "Debes confirmar la contraseña")
    .refine((val) => val === password, {
      message: "Las contraseñas no coinciden",
    });

/**
 * 🧾 Esquemas principales
 * Usados directamente en los formularios.
 */

// LOGIN
export const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// REGISTRO
export const RegisterSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(), // la validación exacta se hará con createConfirmPasswordSchema
});
