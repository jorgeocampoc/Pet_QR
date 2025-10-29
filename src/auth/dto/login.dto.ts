import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Formato de correo no permitido' })
  email: string;
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString({ message: 'password valdiacion' })
  @MinLength(5, {
    message: 'La contraseña debe tener al menos cinco caracteres',
  })
  password: string;
}
