import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";

const navigation = [
  { name: "Dashboard", href: "/Dashboard", current: location.pathname === "/" },
  { name: "Tasks", href: "/Tasks", current: location.pathname === "/tasks" },
  { name: "Activities", href: "/Activities", current: location.pathname === "/activities" },
  { name: "Statistics", href: "/Statistics", current: location.pathname === "/statistics" }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="./favicon.png"
                    alt="TATASk logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="relative ml-3">
                  <div>
                    <Link to="/">
                      <button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://static.vecteezy.com/system/resources/previews/007/335/692/original/account-icon-template-vector.jpg"
                          alt=""
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
