import { IconProps } from "@/types/icon";

export const CiMasterCard = ({
  className,
  size = 22,
  color = "#828282",
}: IconProps) => {
  return (
    <svg
      className={className}
      width={size * 1.55}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_357_788)'>
        <path
          d='M15.5417 2.95833C14.3565 2.1713 13.0556 1.77778 11.6389 1.77778C10.6852 1.77778 9.77083 1.96528 8.89583 2.34028C8.02083 2.71528 7.26852 3.21759 6.63889 3.84722C6.00926 4.47685 5.50694 5.22685 5.13194 6.09722C4.75694 6.96759 4.56944 7.87963 4.56944 8.83333C4.56944 9.7963 4.75694 10.713 5.13194 11.5833C5.50694 12.4537 6.00926 13.2037 6.63889 13.8333C7.26852 14.463 8.01852 14.9653 8.88889 15.3403C9.75926 15.7153 10.6759 15.9028 11.6389 15.9028C13.0556 15.9028 14.3565 15.5093 15.5417 14.7222C14.3287 13.7315 13.5046 12.5023 13.0694 11.0347C12.6343 9.56713 12.6366 8.10185 13.0764 6.63889C13.5162 5.17593 14.338 3.94907 15.5417 2.95833ZM16 3.29167C14.8333 4.20833 14.037 5.36343 13.6111 6.75694C13.1852 8.15046 13.1829 9.54167 13.6042 10.9306C14.0255 12.3194 14.8241 13.4722 16 14.3889C17.1759 13.4722 17.9745 12.3194 18.3958 10.9306C18.8171 9.54167 18.8148 8.15046 18.3889 6.75694C17.963 5.36343 17.1667 4.20833 16 3.29167ZM16.4583 2.95833C17.662 3.94907 18.4838 5.17824 18.9236 6.64583C19.3634 8.11343 19.3657 9.58102 18.9306 11.0486C18.4954 12.5162 17.6713 13.7407 16.4583 14.7222C17.6435 15.5093 18.9444 15.9028 20.3611 15.9028C21.3241 15.9028 22.2407 15.7153 23.1111 15.3403C23.9815 14.9653 24.7315 14.463 25.3611 13.8333C25.9907 13.2037 26.4931 12.4537 26.8681 11.5833C27.2431 10.713 27.4306 9.7963 27.4306 8.83333C27.4306 7.87963 27.2431 6.96759 26.8681 6.09722C26.4931 5.22685 25.9907 4.47685 25.3611 3.84722C24.7315 3.21759 23.9792 2.71528 23.1042 2.34028C22.2292 1.96528 21.3148 1.77778 20.3611 1.77778C18.9444 1.77778 17.6435 2.1713 16.4583 2.95833ZM26.75 12.9861H26.8472V12.9444H26.6111V12.9861H26.7083V13.2222H26.75V12.9861ZM27.1528 13.2222H27.2083V12.9444H27.1389L27.0556 13.125L26.9722 12.9444H26.9028V13.2222H26.9444V13.0139L27.0278 13.1944H27.0833L27.1528 13.0139V13.2222ZM27.0417 19.3333V19.3611H26.9722V19.3194H27.0417V19.3333ZM27.0417 19.4583H27.0833L27.0278 19.3889H27.0556L27.0694 19.375C27.0787 19.3657 27.0833 19.3519 27.0833 19.3333C27.0833 19.3148 27.0787 19.3009 27.0694 19.2917L27.0556 19.2778H26.9306V19.4583H26.9722V19.3889H26.9861L27.0417 19.4583ZM9.51389 18.5139C9.51389 18.338 9.56481 18.1944 9.66667 18.0833C9.76852 17.9722 9.90741 17.9167 10.0833 17.9167C10.25 17.9167 10.3843 17.9745 10.4861 18.0903C10.588 18.206 10.6389 18.3472 10.6389 18.5139C10.6389 18.6898 10.588 18.8333 10.4861 18.9444C10.3843 19.0556 10.25 19.1111 10.0833 19.1111C9.90741 19.1111 9.76852 19.0556 9.66667 18.9444C9.56481 18.8333 9.51389 18.6898 9.51389 18.5139ZM16.0833 17.9028C16.3611 17.9028 16.5231 18.0509 16.5694 18.3472H15.5972C15.6435 18.0509 15.8056 17.9028 16.0833 17.9028ZM21.0278 18.5139C21.0278 18.338 21.0787 18.1944 21.1806 18.0833C21.2824 17.9722 21.4167 17.9167 21.5833 17.9167C21.75 17.9167 21.8866 17.9745 21.9931 18.0903C22.0995 18.206 22.1528 18.3472 22.1528 18.5139C22.1528 18.6898 22.1019 18.8333 22 18.9444C21.8981 19.0556 21.7593 19.1111 21.5833 19.1111C21.4167 19.1111 21.2824 19.0556 21.1806 18.9444C21.0787 18.8333 21.0278 18.6898 21.0278 18.5139ZM24.8056 18.5139C24.8056 18.3472 24.8588 18.206 24.9653 18.0903C25.0718 17.9745 25.2083 17.9167 25.375 17.9167C25.5417 17.9167 25.6782 17.9745 25.7847 18.0903C25.8912 18.206 25.9444 18.3472 25.9444 18.5139C25.9444 18.6898 25.8912 18.8333 25.7847 18.9444C25.6782 19.0556 25.5417 19.1111 25.375 19.1111C25.2083 19.1111 25.0718 19.0532 24.9653 18.9375C24.8588 18.8218 24.8056 18.6806 24.8056 18.5139ZM27 19.5139C26.9815 19.5139 26.963 19.5093 26.9444 19.5C26.9352 19.5 26.9213 19.4907 26.9028 19.4722C26.8843 19.4537 26.875 19.4398 26.875 19.4306C26.8657 19.412 26.8611 19.3935 26.8611 19.375C26.8611 19.3472 26.8657 19.3287 26.875 19.3194C26.875 19.3009 26.8843 19.2824 26.9028 19.2639L26.9167 19.25C26.9352 19.25 26.9444 19.2454 26.9444 19.2361C26.963 19.2269 26.9815 19.2222 27 19.2222C27.0278 19.2222 27.0463 19.2269 27.0556 19.2361L27.1111 19.2639L27.1389 19.3194V19.3333C27.1481 19.3519 27.1528 19.3657 27.1528 19.375L27.1389 19.3889V19.4306L27.125 19.4444L27.1111 19.4722C27.0926 19.4907 27.0741 19.5 27.0556 19.5C27.0463 19.5093 27.0278 19.5139 27 19.5139ZM8.31944 19.4583H8.73611V18.2778C8.73611 18.0556 8.66898 17.8773 8.53472 17.7431C8.40046 17.6088 8.21759 17.537 7.98611 17.5278C7.68982 17.5278 7.47222 17.6389 7.33333 17.8611C7.2037 17.6389 6.99537 17.5278 6.70833 17.5278C6.48611 17.5278 6.30556 17.6204 6.16667 17.8056V17.5833H5.75V19.4583H6.16667V18.4167C6.16667 18.0833 6.31944 17.9167 6.625 17.9167C6.90278 17.9167 7.04167 18.0833 7.04167 18.4167V19.4583H7.44444V18.4167C7.44444 18.0833 7.59722 17.9167 7.90278 17.9167C8.18056 17.9167 8.31944 18.0833 8.31944 18.4167V19.4583ZM10.625 19.4583H11.0278V17.5833H10.625V17.8056C10.4676 17.6204 10.2685 17.5278 10.0278 17.5278C9.75926 17.5278 9.53704 17.6204 9.36111 17.8056C9.18519 17.9907 9.09722 18.2269 9.09722 18.5139C9.09722 18.8009 9.18519 19.037 9.36111 19.2222C9.53704 19.4074 9.75926 19.5 10.0278 19.5C10.287 19.5 10.4861 19.4074 10.625 19.2222V19.4583ZM13.0972 18.8889C13.0972 18.5741 12.8796 18.3889 12.4444 18.3333L12.25 18.3056C12.037 18.2685 11.9306 18.2037 11.9306 18.1111C11.9306 17.9722 12.0463 17.9028 12.2778 17.9028C12.4907 17.9028 12.6898 17.9537 12.875 18.0556L13.0417 17.7222C12.838 17.5926 12.5833 17.5278 12.2778 17.5278C12.037 17.5278 11.8472 17.5833 11.7083 17.6944C11.5694 17.8056 11.5 17.9537 11.5 18.1389C11.5 18.4444 11.7176 18.625 12.1528 18.6806L12.3333 18.7083C12.5556 18.7454 12.6667 18.8102 12.6667 18.9028C12.6667 19.0602 12.5231 19.1389 12.2361 19.1389C12.0046 19.1389 11.7963 19.0741 11.6111 18.9444L11.4306 19.2639C11.662 19.4213 11.9306 19.5 12.2361 19.5C12.5046 19.5 12.7153 19.4444 12.8681 19.3333C13.0208 19.2222 13.0972 19.0741 13.0972 18.8889ZM14.9028 19.3611L14.7917 19.0139C14.6713 19.0787 14.5509 19.1111 14.4306 19.1111C14.2546 19.1111 14.1667 19.0093 14.1667 18.8056V17.9583H14.8333V17.5833H14.1667V17.0139H13.75V17.5833H13.3611V17.9583H13.75V18.8056C13.75 19.2685 13.9676 19.5 14.4028 19.5C14.5972 19.5 14.7639 19.4537 14.9028 19.3611ZM16.0972 17.5278C15.8287 17.5278 15.6065 17.6204 15.4306 17.8056C15.2546 17.9907 15.1667 18.2269 15.1667 18.5139C15.1667 18.8102 15.2569 19.0486 15.4375 19.2292C15.6181 19.4097 15.8472 19.5 16.125 19.5C16.4306 19.5 16.6852 19.412 16.8889 19.2361L16.6944 18.9306C16.5278 19.0694 16.3472 19.1389 16.1528 19.1389C15.838 19.1389 15.6481 18.9861 15.5833 18.6806H16.9861V18.5139C16.9861 18.2176 16.9028 17.9792 16.7361 17.7986C16.5694 17.6181 16.3565 17.5278 16.0972 17.5278ZM18.3056 17.5278C18.0926 17.5278 17.9306 17.6204 17.8194 17.8056V17.5833H17.4028V19.4583H17.8194V18.4028C17.8194 18.0787 17.9537 17.9167 18.2222 17.9167C18.3148 17.9167 18.3981 17.9352 18.4722 17.9722L18.5972 17.5833C18.5139 17.5463 18.4167 17.5278 18.3056 17.5278ZM18.7222 18.5139C18.7222 18.8009 18.8125 19.037 18.9931 19.2222C19.1736 19.4074 19.4167 19.5 19.7222 19.5C19.9907 19.5 20.213 19.4259 20.3889 19.2778L20.1944 18.9444C20.0278 19.0648 19.8657 19.1204 19.7083 19.1111C19.5417 19.1111 19.4051 19.0556 19.2986 18.9444C19.1921 18.8333 19.1389 18.6898 19.1389 18.5139C19.1389 18.338 19.1921 18.1944 19.2986 18.0833C19.4051 17.9722 19.5417 17.9167 19.7083 17.9167C19.8843 17.9167 20.0463 17.9722 20.1944 18.0833L20.3889 17.75C20.2037 17.6019 19.9815 17.5278 19.7222 17.5278C19.4167 17.5278 19.1736 17.6204 18.9931 17.8056C18.8125 17.9907 18.7222 18.2269 18.7222 18.5139ZM22.125 19.4583H22.5417V17.5833H22.125V17.8056C21.9861 17.6204 21.7917 17.5278 21.5417 17.5278C21.2731 17.5278 21.0486 17.6204 20.8681 17.8056C20.6875 17.9907 20.5972 18.2269 20.5972 18.5139C20.5972 18.8009 20.6875 19.037 20.8681 19.2222C21.0486 19.4074 21.2731 19.5 21.5417 19.5C21.8009 19.5 21.9954 19.4074 22.125 19.2222V19.4583ZM23.9722 17.5278C23.7593 17.5278 23.5972 17.6204 23.4861 17.8056V17.5833H23.0833V19.4583H23.4861V18.4028C23.4861 18.0787 23.6204 17.9167 23.8889 17.9167C23.9815 17.9167 24.0648 17.9352 24.1389 17.9722L24.2639 17.5833C24.1898 17.5463 24.0926 17.5278 23.9722 17.5278ZM25.9167 19.4583H26.3194V16.8194H25.9167V17.8056C25.7778 17.6204 25.5787 17.5278 25.3194 17.5278C25.0602 17.5278 24.8403 17.6227 24.6597 17.8125C24.4792 18.0023 24.3889 18.2361 24.3889 18.5139C24.3889 18.7917 24.4792 19.0255 24.6597 19.2153C24.8403 19.4051 25.0602 19.5 25.3194 19.5C25.588 19.5 25.787 19.4074 25.9167 19.2222V19.4583ZM27 19.1806L26.9722 19.1944H26.9306C26.912 19.2037 26.8935 19.2176 26.875 19.2361C26.8472 19.2454 26.8333 19.2639 26.8333 19.2917C26.8241 19.3102 26.8194 19.338 26.8194 19.375C26.8194 19.4028 26.8241 19.4259 26.8333 19.4444C26.8333 19.463 26.8472 19.4815 26.875 19.5C26.8935 19.5185 26.912 19.5324 26.9306 19.5417C26.9491 19.5509 26.9722 19.5556 27 19.5556C27.037 19.5556 27.0648 19.5509 27.0833 19.5417C27.0833 19.5324 27.0926 19.5231 27.1111 19.5139L27.1389 19.5C27.1481 19.4907 27.162 19.4722 27.1806 19.4444C27.1898 19.4259 27.1944 19.4028 27.1944 19.375C27.1944 19.338 27.1898 19.3102 27.1806 19.2917C27.1713 19.2824 27.1574 19.2639 27.1389 19.2361C27.1389 19.2269 27.1296 19.2176 27.1111 19.2083L27.0833 19.1944C27.0741 19.1944 27.0602 19.1921 27.0417 19.1875C27.0231 19.1829 27.0093 19.1806 27 19.1806ZM32 1.77778V19.5556C32 20.037 31.8241 20.4537 31.4722 20.8056C31.1204 21.1574 30.7037 21.3333 30.2222 21.3333H1.77778C1.2963 21.3333 0.87963 21.1574 0.527778 20.8056C0.175926 20.4537 0 20.037 0 19.5556V1.77778C0 1.2963 0.175926 0.87963 0.527778 0.527778C0.87963 0.175926 1.2963 0 1.77778 0H30.2222C30.7037 0 31.1204 0.175926 31.4722 0.527778C31.8241 0.87963 32 1.2963 32 1.77778Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_357_788'>
          <rect
            width={size * 1.5}
            height={size}
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  );
};
