"use client";
import { useUserManagent } from "../_viewmodels/useUserManagent";
import Image from "next/image";

const UserManagement = () => {
  const { users, isLoading, formatDate } = useUserManagent();

  if (isLoading) {
    return (
      <div className="p-2 flex flex-col w-full justify-start items-start">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-2/3">
        <div className="grid grid-cols-4 gap-2 items-center p-2 font-semibold">
          <p>Imagem</p>
          <p>Nome</p>
          <p>Atualizado em</p>
          <p>Ações</p>
        </div>
        {users.map((user) => (
          <div
            key={user.id}
            className="w-full grid grid-cols-4 gap-2 items-center p-2 border-b border-solid border-opacity-50 border-gray-400"
          >
            {user.avatar && (
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={user.avatar}
                  alt={user.username || "Avatar"}
                  className="object-cover"
                  fill
                />
              </div>
            )}
            <p>{user.username}</p>
            <p>{formatDate(user.updated_at)}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserManagement;
